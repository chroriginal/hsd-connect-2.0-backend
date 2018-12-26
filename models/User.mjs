import mongoose from 'mongoose'
import userNotificationSchema from './sub/UserNotification'
import {
  schemaValidators,
  schemaUtils,
  schemaValidatorMessages
} from '../utils/models/schemaUtils'
import {
  userValidators,
  userRecordUtils,
  userValidationErrors
} from '../utils/models/userUtils'

const userSchema = new mongoose.Schema({
  firstname: {
    type: mongoose.Schema.Types.String,
    required: [true, schemaValidatorMessages.isRequired('firstname')]
  },
  lastname: {
    type: mongoose.Schema.Types.String,
    required: [true, schemaValidatorMessages.isRequired('lastname')]
  },
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: [true, schemaValidatorMessages.isRequired('e-mail')]
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: [true, schemaValidatorMessages.isRequired('password')]
  },
  settings: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      language: 'de',
      receiveNotifications: true
    }
  },
  optionalInformation: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      major: '',
      expectedGraduation: {
        month: null,
        year: null
      }
    }
  },
  bookmarkedProjects: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Project',
    default: []
  },
  authorization: {
    type: mongoose.Schema.Types.Mixed,
    default: {
      isUser: true,
      isModerator: false,
      isSuperadmin: false
    }
  },
  notifications: {
    type: [userNotificationSchema],
    default: []
  },
  image: {
    type: [mongoose.Schema.Types.String],
    default: []
  },
  isActive: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  verificationCode: {
    type: mongoose.Schema.Types.String,
    default: ''
  },
  isVerified: {
    type: mongoose.Schema.Types.Boolean,
    default: false
  },
  updatedAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  },
  createdAt: {
    type: mongoose.Schema.Types.Date,
    default: Date.now()
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})
userSchema.pre('validate', userRecordUtils.setNameOfEmail)
userSchema.pre('validate', userValidators.validateEmail)
userSchema.pre(
  'validate',
  schemaValidators.validateProperty(
    'email',
    async function (query) {
      return !(await User.find(query)).length
    },
    userValidationErrors.uniqueEmail
  )
)
userSchema.pre('validate', userValidators.validatePassword)
userSchema.pre('validate', userRecordUtils.setHashedPassword)
userSchema.pre('validate', schemaUtils.setPropertyDate('updatedAt'))

const User = mongoose.model('User', userSchema)

User.createUser = userProperties => {
  try {
    return new User({
      email: userProperties.email,
      password: userProperties.password
    }).save()
  } catch (err) {
    throw err
  }
}

export default User
