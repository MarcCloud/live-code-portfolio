import User from './model';
const create = (profile)=>{
    return User.create(profile)
        .then((user)=>user);
};

export default create;
