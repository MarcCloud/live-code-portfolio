import signInFactory from './signin/view';
export default React => (props)=>{
    const signIn = signInFactory(React);
    return <section>
                <header><h1>{ props.message + '!!' }</h1></header>
                {signIn()}
            </section>;
};
