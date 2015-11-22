export default React=>(props)=>{
    return <div className="persona">
                <img className="picture" src={props.picture} alt=""/>
                <span className="name">{props.name}</span>
                <span className="bio">{props.bio}</span>
           </div>;
};
