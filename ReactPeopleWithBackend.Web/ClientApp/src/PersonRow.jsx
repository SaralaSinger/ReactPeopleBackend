import React from 'react';
function PersonRow({ person, onDelete, onEdit, onCheck, isChecked }) {
    const {firstName, lastName, age} = person;
    return <>
        <tr>
            <td>
                <div className='d-flex justify-content-center align-items-center'>
                    <input checked={isChecked} onChange={onCheck} type="checkbox" className='form-check-input mt-2'  />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className='btn btn-warning' onClick={onEdit}>Edit</button>
                <button className='btn btn-danger' onClick={onDelete} style={{ marginLeft: 10 }}>Delete</button>
            </td>
        </tr>
    </>
};

export default PersonRow;