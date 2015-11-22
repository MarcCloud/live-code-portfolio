import React from 'react';

export default React.createClass({
    render (){
        return <section>
                    <h1>Deckxpert</h1>
                    {this.props.children}
               </section>;
    }
});
