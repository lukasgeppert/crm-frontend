import React from 'react'

export default function BrokerInfo(props){
    const data = props.data
    return (
        <div className="customer-info">
            <p>{data.email}</p>
            <p>{data.secondemail}</p>
            <p>{data.phone}</p>
            <h3>Address</h3>
            <address>
                <p>{data.adescription4}</p>
                <p>{`${data.adescription2}, ${data.adescription3}`}</p>
                <p>{data.adescription1}</p>
            </address>
            <h3>Bank Information</h3>

            {(data.bankaccount) 
                ? <>
                <div className="contact-grid">
                    <p>Bank:</p>
                    <p>{data.bank}</p>
                </div>
                <div className="contact-grid">
                    <p>Bank Code:</p>
                    <p>{data.bankcode}</p>
                </div>
                <div className="contact-grid">
                    <p>Bank Account:</p>
                    <p>{data.bankaccount}</p>
                </div>
                </>
                : <div className="contact-grid">
                    <p className="nothing-to-display">No bank information to display</p>
                </div>
            }
            
            <h3>Additional Information</h3>
            <div className="contact-grid">
                <p>Tax ID:</p>
                <p>{data.taxid}</p>
            </div>
            <div className="contact-grid">
                <p>Additional Comments:</p>
                <p>{data.comment}</p>
            </div>
        </div>
    )
}