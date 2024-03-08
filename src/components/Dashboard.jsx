import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
function Dashboard({ user, setUser }) {
  let [title, setTitle] = useState("");
  let [des, setDes] = useState("");
  let [status, setStatus] = useState(0);
  let [filter, setFilter] = useState("all");
  let [view, setView] = useState(user);
  let [edit, setEdit] = useState();

  useEffect(() => {
    if (filter == 0) {
      setView(user);
    } else if (filter == 1) {
      setView(user.filter((e) => e.status == true));
    } else {
      setView(user.filter((e) => e.status == false));
    }
  }, [filter, user]);

  function handleSubmit() {
    if (edit == undefined) {
      let newArray = [...user];
      newArray.push({
        title,
        des,
        status,
      });
      setUser(newArray);
    } else {
          setUser(
        user.map((value, i) => {
          if (i == edit) {
            return { title, des, status };
          } else {
            return value;
          }
        })
      );
      setEdit(undefined);
    }
    setDes("");
    setTitle("");
  }
  function handleStatus(status, id) {
    let tempuser = user;
    // let userdata=tempuser.filter((data)=>data.id===id)[0]
    // userdata.status=status
    let index = tempuser.findIndex((data) => data.id === id);
    tempuser[index].status = status;
    setUser([...tempuser]);
  }

  // Delete todo
  function handleDelete(i) {
    let newarray = [...user];
    newarray.splice(i, 1);
    setUser(newarray);
  }
  // Edit todo
  function handleEdit(i, value) {
    setTitle(value.title);
    setDes(value.des);
    setEdit(i);
  }

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center", marginTop: "15px" }}>My Todo</h1>
        <div className="form">
          <Form.Control
            type="text"
            placeholder="Task"
            className="w-25 p-3"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Form.Control
            type="text"
            placeholder="Description"
            className="w-50 p-3"
            value={des}
            onChange={(e) => {
              setDes(e.target.value);
            }}
          />
          <Button onClick={() => handleSubmit()}>Add Todo</Button>
        </div>

        <div className="centerContent">
          <h2>All Todo's</h2>
          <select
            className="dropdown"
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value={"all"}>All</option>
            <option value={"completed"}>Completed</option>
            <option value={"NotCompleted"}>NotCompleted</option>
          </select>
        </div>
      </div>
      <div className="Cards">
        {user
          .filter((data) => {
            if (filter === "all") {
              return true;
            } else {
              return data.status === filter;
            }
          })
          .map((value, i) => {
            return (
              <Card
                style={{ width: "18rem", backgroundColor: "antiquewhite" }}
                key={i}
              >
                <Card.Body>
                  <Card.Title>{value.title}</Card.Title>
                  <Card.Text>{value.des}</Card.Text>
                  <select
                    className="dropdown"
                    onChange={(e) => {
                      handleStatus(e.target.value, value.id);
                    }}
                    value={value.status}
                  >
                    <option value={"NotCompleted"}>NotCompleted</option>
                    <option value={"completed"}>Completed</option>
                  </select>
                  <br></br>
                  <Button variant="info" onClick={() => handleEdit(i, value)}>
                    Edit
                  </Button>{" "}
                  &nbsp;
                  <Button variant="danger" onClick={() => handleDelete(i)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    </>
  );
}

export default Dashboard;
