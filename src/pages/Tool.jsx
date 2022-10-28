import { useParams } from 'react-router-dom';

const Tool = () => {
    const { id } = useParams();
    return (
        <div>
        <h1>Tool {id}</h1>
        </div>
    );
}

export default Tool