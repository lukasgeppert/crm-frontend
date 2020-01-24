import React, { Component } from 'react'
import ApiService from '../../../../../services/api-service'
import config from '../../../../../config'

class PaymentHistory extends Component {
    constructor(props){
        super(props)
        this.state = {
            error: null,
            payments: [],
        }
    }

    componentDidMount(){
        ApiService.getDataHalf(`${config.API_ENDPOINT}/customers/0/transfers`)
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return (
            <div className='data-container'>
                <h3>Payment History</h3>
                <table className='data-table'>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Charge</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        (this.state.payments[0]) 
                        ?
                            this.state.payments.map(c => {
                                return (
                                    <tr key={c.id}>
                                        <td>Date Issued</td>
                                        <td>Name</td>
                                        {/* <td>{(c.confirmatindate) ? `Completed ${c.requestdate}` : 'Pending'}</td>  */}
                                        <td>Status</td>
                                        <td className="action-icon">View</td>                                       
                                    </tr>
                                )})
                            : ( <tr>
                                    <td className="nothing-to-display">You have not submitted any payments yet</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> )
                        }
                    </tbody>
                </table>
                <br></br>
                <p className="entry-count">Showing {this.state.payments.length} of {this.state.payments.length} entries</p>
            </div>
        )
    }
}

export default PaymentHistory