import {createContext, useEffect, useState} from 'react'
import axios from '../constants/axiosConfig'

export const QuestionContext = createContext();

const QuestionProvider = ({children}) => {
    const [questions, setQuestions] = useState([]);
    const [studentQues,setStudentQues] = useState([])

    useEffect(() => {
        axios.get("/api/admin/get/allQuestions")
            .then((res) => { setQuestions(res.data) 
                console.log('responseis',res.data)
            })
            .catch((err) => console.error("Error fetching questions:", err));
    }, []);


    useEffect(() => {
        // Fetch questions from API
        axios.get("/api/getAllQuestions")
          .then(response => {
            setStudentQues(response.data.slice(0, 5)); // Limit to 5 questions
            console.log('response for student quest',response.data)
          })
          .catch(error => console.error("Error fetching questions:", error));
      }, []);

    const create_question = async(data)=>{
        let response = await axios.post("/api/admin/create",data);
        console.log('response',response.data)
    

        if(response.status === 201)
        {
            setQuestions([...questions,response.data.question]);
        }else {
            console.log("Error creating question:", response.data.message);
        }

    }
    const list_questions = async()=>{
        let response = await axios.get("/api/admin/get/allQuestions");
    

        if(response.status === 200)
        {
            setQuestions(response.data.questions);
        }else {
            console.log("Error creating question:", response.data.message);
        }
    }

    const update_question = async(id,data)=>{
        let response = await axios.patch(`/api/admin/update/${id}`,data);
    

        if(response.status === 200)
        {
            setQuestions([...questions,response.data]);
        }else {
            console.log("Error creating question:", response.data.message);
        }
    }

    const delete_question = async(id)=>{
        let response = await axios.delete(`/api/admin/delete/${id}`);
    

        if(response.status === 200)
        {
            setQuestions(questions.filter((q) => q._id !== id))
        }else {
            console.log("Error creating question:", response.data.message);
        }
    }


    const submit_answer = async(data)=>{
        let response = await axios.post("/api/submit-answer",data);
    

        if(response.status === 201)
        {
            // setQuestions([...questions,response.data]);
            console.log('response',response.data)
        }else {
            console.log("Error creating question:", response.data.message);
        }

    }

    return <QuestionContext.Provider value={{create_question,list_questions,update_question,delete_question,questions,studentQues,submit_answer}}>
        {children}
    </QuestionContext.Provider>
}


export default QuestionProvider;