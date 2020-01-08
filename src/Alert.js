import React from 'react';

function Alert({success,message, onClose}) {
    if(message == null) {
        return null;
    }
    if(success){
        return (
            <div className="alert alert-success alert-dismissable">
                <strong>Success!</strong> {message}
                <button type="button" className="close" onClick={()=> onClose()}>
                    <span>&times;</span>
                </button>
            </div>
        );
    }else{
    return (
        <div className="alert alert-warning alert-dismissable">
            <strong>Error!</strong> {message}
            <button type="button" className="close" onClick={()=> onClose()}>
                <span>&times;</span>
            </button>
        </div>
    );
}
}

export default Alert;