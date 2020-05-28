import PleaseSingIn from '../components/PleaseSignin'
import Order from '../components/Order'

const OrderPage = props => (
    
    <div>
        <PleaseSingIn>
        <Order id={props.query.id} />
        </PleaseSingIn>
    </div>
    
)

export default OrderPage