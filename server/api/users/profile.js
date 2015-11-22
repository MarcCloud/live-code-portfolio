import User from './model';

export default {
    retrieve (id){
        return User.findOne({_id: id})
            .then((profile)=> profile)
            .catch(console.error.bind(console, 'There was an error retrieving the profile requested: '));
    },
    create (profile){
        return User.create(profile)
            .then((user)=>user);
    },
    modify (id, props){
        return User.update({_id: id}, {$set: props})
            .then((result)=> result)
            .catch(console.error.bind('Could not update profile: '));
    }
}