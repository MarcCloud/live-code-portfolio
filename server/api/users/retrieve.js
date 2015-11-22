import User from './model';

const retrieve = (id)=>{
    return User.findOne({_id: id})
        .then((profile)=> profile)
        .catch(console.error.bind(console, 'There was an error retrieving the profile requested: '));
};

export default retrieve;
