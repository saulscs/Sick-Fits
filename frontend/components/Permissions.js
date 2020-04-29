import {Query} from 'react-apollo'
import Error from './ErrorMessage'
import gql from 'graphql-tag'
import Table from './styles/Table'
import SickButton from './styles/SickButton'
import PropTypes from 'prop-types'

const possiblePermissions = [ 
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONSUPDATE',

];


const ALL_USERS_QUERY = gql `
    query {
        users{
            id
            name
            email
            permissions
        }
    }
`

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({data, loading, error}) => console.log(data) ||  (
            <div>
                <Error error={error}/>
                <h2>Manage Permissions</h2>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            {possiblePermissions.map(permissions => 
                                <th key={permissions}>{permissions}</th>)}

                            <th>👇</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.users.map( user => <UserPermissions user={user} key={user.id} />)}
                    </tbody>
                </Table>
            </div>
        )}
    </Query>
)

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permission: PropTypes.array
        }).isRequired,
    };

    state = {
        permissions: this.props.user.permissions,
    };

    handlePermissionChange = e => {
        const checkbox = e.target;
        //take a copy of the current permissions
        let updatePermissions = [...this.state.permissions]
        // figure out if we need to remove or ad this permissions
        if (checkbox.checked){
            //add it in !
            updatePermissions.push(checkbox.value)
        } else {
            updatePermissions = updatePermissions.filter(permission => permission !== checkbox.value)
        }
        this.setState({permissions: updatePermissions})

        console.log(updatePermissions)
    }
    render() {
        const user = this.props.user
        return (
            <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                    <td key={permission}>
                        <label htmlFor={`${user.id}-permission-${permission}`}>
                            <input 
                            id={`${user.id}-permission-${permission}`}
                            type="checkbox" 
                            checked={this.state.permissions.includes(permission)}
                            value={permission}
                            onChange={this.handlePermissionChange}
                            />
                        </label>
                    </td>
                ))}
                <td>
                    <SickButton>Update</SickButton>
                </td>
            </tr>
        );
    };
};


export default Permissions