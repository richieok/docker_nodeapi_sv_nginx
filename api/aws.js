import { SSMClient, GetParametersByPathCommand } from "@aws-sdk/client-ssm"

const client = new SSMClient({ region: 'us-east-1' });

await getParameters(process.env.SSM_PARAMETER_PATH || '/devconzero/env/');

async function getParameters(path) {
    if ( process.env.NODE_ENV !== 'production' && process.env.CLOUD !== 'aws') {
        return;
    }
    try {
        const input = {
            Path: path,
            Recursive: true,
            WithDecryption: true
        }
        const command = new GetParametersByPathCommand(input);
        console.log("get parameters marker 1!")
        const response = await client.send(command);
        console.log("get parameters marker 2!")
        
        response.Parameters.forEach(param => {
            console.log(`Loading parameter: ${param.Name} with value: ${param.Value}`);
            const key = param.Name.replace(path, '').toUpperCase();
            process.env[key] = param.Value;
        });
    }
    catch (error) {
        console.error('Error fetching parameters:', error);
    }
}
