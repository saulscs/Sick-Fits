import Items from '../components/items'

const Home = props => (
    
    <div>
        <Items page={parseFloat(props.query.page) || 1}/>
    </div>
    
)

export default Home