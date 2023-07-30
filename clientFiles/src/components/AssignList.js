const AssignmentList = ({ assignlist,handleMarkComplete,handleMarkIncomplete }) => {
    return (
        <div className="assign-list">
            {
                assignlist.map(assignment => (
                    <div className="assignpreview" key={assignment[1]} style={{backgroundColor: (assignment[3]==0)? 'rgba(255,0,0,0.5)':'rgba(0,128,0,0.5)'}}>
                        <h2>{assignment[0][0]}</h2>
                        <p>Course:&nbsp;&nbsp;&nbsp; {assignment[0][1]}</p>
                        <p>Semester: {assignment[2]}</p>
                        <p>Deadline: {assignment[0][2].slice(11, 16)} -- {assignment[0][2].slice(0, 10)}</p>
                        {
                            assignment[3] == 0 && <>
                                <h6>Incomplete</h6>
                                <button onClick={()=>handleMarkComplete(assignment[1])} id='completeBtn' >Mark Completed</button>
                            </>
                        }
                        {
                            !(assignment[3]== 0) && <>
                                <h6>Completed</h6>
                                <button onClick={()=>handleMarkIncomplete(assignment[1])} id="incompletebtn"
                                >Mark Incomplete</button>
                            </>
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default AssignmentList

