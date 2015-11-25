import User from './model';

const retrieve = (id, cb)=>{
    User.findOne({_id: id})
        .then(profile=>{
            cb(null, profile);
        })
        .catch(error=>{
            console.error('Error retrieving user: %s', JSON.stringify(error));
            cb(error);
        });
};

export default retrieve;
