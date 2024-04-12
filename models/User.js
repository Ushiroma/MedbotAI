import mongoose, {Schema} from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String, required: true
        },
        lastName:{
            type: String, required: true
        },
        username: {
            type: String, required: true, unique: true
        },
        email: {
            type: String, required: true, unique: true
        },
        password:{
            type: String, required: true
        },
        dob:{
            type: Date, required: true
        },
        gender:{
            type: String,

        required: true,

        enum: ['male', 'female', 'other']
        },
        profileImage:{
            type: String, required: false, default: "https://th.bing.com/th/id/OIG4.uluTC7S6Z2SLxr0uNGU9?w=270&h=270&c=6&r=0&o=5&dpr=1.3&pid=ImgGn"
        },
        isAdmin: {
            type: Boolean, default: false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            required: true,
            ref: "Role"
        }
    },

    {
        timestamp: true
    }

);

export default mongoose.model("User", UserSchema);