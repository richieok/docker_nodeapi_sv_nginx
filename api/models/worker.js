import { Schema, model } from 'mongoose'

export const workerSchema = new Schema({
    // Personal Information
    personalInfo: {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            maxLength: [50, 'First name cannot exceed 50 characters']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            maxLength: [50, 'Last name cannot exceed 50 characters']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            validate: {
                validator: function (email) {
                    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
                },
                message: 'Please enter a valid email address'
            }
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            validate: {
                validator: function (phone) {
                    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/[\s\-\(\)]/g, ''));
                },
                message: 'Please enter a valid phone number'
            }
        },
        dateOfBirth: {
            type: Date,
            required: [true, 'Date of birth is required'],
            validate: {
                validator: function (date) {
                    const age = (new Date() - date) / (365.25 * 24 * 60 * 60 * 1000);
                    return age >= 16 && age <= 100;
                },
                message: 'Worker must be between 16 and 100 years old'
            }
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', 'prefer-not-to-say'],
            default: 'prefer-not-to-say'
        }
    },

    // Address Information
    address: {
        street: {
            type: String,
            required: [true, 'Street address is required'],
            trim: true,
            maxLength: [100, 'Street address cannot exceed 100 characters']
        },
        city: {
            type: String,
            required: [true, 'City is required'],
            trim: true,
            maxLength: [50, 'City name cannot exceed 50 characters']
        },
        state: {
            type: String,
            required: [true, 'State/Province is required'],
            trim: true,
            maxLength: [50, 'State/Province cannot exceed 50 characters']
        },
        zipCode: {
            type: String,
            trim: true,
            maxLength: [20, 'ZIP/Postal code cannot exceed 20 characters']
        },
        country: {
            type: String,
            default: 'United States',
            trim: true,
            maxLength: [50, 'Country name cannot exceed 50 characters']
        }
    },
    // Professional Information
    professional: {
        primaryProfession: {
            type: String,
            required: [true, 'Primary profession is required'],
            enum: [
                'construction', 'electrician', 'plumber', 'carpenter', 'mechanic',
                'landscaper', 'cleaner', 'driver', 'warehouse', 'retail',
                'food-service', 'healthcare', 'it-support', 'administrative', 'other'
            ]
        },
        yearsOfExperience: {
            type: String,
            enum: ['0-1', '2-5', '6-10', '11-15', '16+']
        },
        skills: [{
            name: {
                type: String,
                required: true,
                trim: true
            },
            level: {
                type: String,
                enum: ['beginner', 'intermediate', 'advanced', 'expert'],
                default: 'intermediate'
            },
            certified: {
                type: Boolean,
                default: false
            }
        }],
        certifications: [{
            name: {
                type: String,
                required: true,
                trim: true
            },
            issuingOrganization: {
                type: String,
                trim: true
            },
            issueDate: Date,
            expirationDate: Date,
            certificateNumber: String,
            isActive: {
                type: Boolean,
                default: true
            }
        }],
        hourlyRate: {
            min: {
                type: Number,
                min: [0, 'Hourly rate cannot be negative']
            },
            max: {
                type: Number,
                min: [0, 'Hourly rate cannot be negative']
            },
            currency: {
                type: String,
                default: 'USD'
            }
        },
        availability: {
            type: {
                type: String,
                enum: ['full-time', 'part-time', 'weekends', 'evenings', 'flexible'],
                required: true
            },
            schedule: {
                monday: { available: Boolean, startTime: String, endTime: String },
                tuesday: { available: Boolean, startTime: String, endTime: String },
                wednesday: { available: Boolean, startTime: String, endTime: String },
                thursday: { available: Boolean, startTime: String, endTime: String },
                friday: { available: Boolean, startTime: String, endTime: String },
                saturday: { available: Boolean, startTime: String, endTime: String },
                sunday: { available: Boolean, startTime: String, endTime: String }
            }
        }
    },
    // Employment History
    employmentHistory: [{
        employer: {
            type: String,
            required: true,
            trim: true
        },
        position: {
            type: String,
            required: true,
            trim: true
        },
        startDate: {
            type: Date,
            required: true
        },
        endDate: Date, // null if current job
        description: String,
        reasonForLeaving: String,
        salary: Number,
        references: [{
            name: String,
            position: String,
            phone: String,
            email: String
        }]
    }],
})

export const Worker = model('Worker', workerSchema)
