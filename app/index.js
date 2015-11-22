import { render } from 'react-dom';
import routes from './routes/router';


routes.routeWindow(window)[0].then(component=>{
    render(component, document.getElementById('root'));
});



