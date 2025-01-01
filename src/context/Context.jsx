import { createContext, useState, useEffect, useMemo } from "react"
import run from "../Config";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../firebase/firebase";

export const Context=createContext()

export const ContextProvider = (props) =>{

    const [input,setInput]=useState("")
    const [prompt,setPrompt]=useState("")
    const [prevPrompt,setPrevPrompt]=useState([])
    const [result,setResult]=useState([])
    const [loading,setLoading]=useState(false)
    const [showResult,setShowResult]=useState(false)
    const [currentUser,setCurrentUser] = useState()
    const [recent,setRecent] = useState([])
    const [id,setId] = useState(0)


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,initializeUser)
        return unsubscribe
    },[])

    
    // useEffect(() => {
    //   if (currentUser) {
    //     const newChatEntry = { prompt: prevPrompt, result: result };
    //     let updatedChat = [];
    
    //     if (recent && recent.length > 0) {
    //       updatedChat = recent.map((chat, index) =>
    //         index === id ? newChatEntry : chat
    //       );
    //     } else {
    //       updatedChat = [newChatEntry];
    //     }
    
    //     setRecent(updatedChat);
    //     localStorage.setItem(currentUser.email, JSON.stringify(updatedChat));
    //   }
    // }, [result, currentUser, recent, id, prevPrompt]);
    
    

    const initializeUser = (user)=>{
        if(user){
            setCurrentUser({...user})
            console.log(user)
            console.log("Logged in sucessfully",localStorage.getItem(user.email))
            const updateChat = JSON.parse(localStorage.getItem(user.email)) || [];
            setRecent(updateChat)
            const length = updateChat.length
            setId(length)
            console.log(id)
        }
        else{
            setCurrentUser(null)
            console.log("Something went Wrong")
        }
    }


    
    
    const onSent = async (prompt) => {
        setLoading(true)
        setPrompt(input)
        const response=await run(input)
        let newResponse=response.split("**")
        const formattedResponse = newResponse
                .map((item, index) => (index % 2 === 1 ? `<b>${item}</b>` : item))
                .join("")
                .split("*")
                .join("<br>");
        setLoading(false)
        setInput("")
        setResult((prev)=>[...prev,formattedResponse])
        setPrevPrompt((prev)=>[...prev,input])
        const newChatEntry = { prompt: [...prevPrompt,input], result: [...result, formattedResponse] };
        const updatedChat = recent.some((_, index) => index === id)
          ? recent.map((chat, index) => index === id ? newChatEntry : chat)
          : [...recent, newChatEntry];
        setRecent(updatedChat);
        localStorage.setItem(currentUser.email, JSON.stringify(updatedChat));
        setShowResult(true)
        
    }
    

    const newChat = () => {
      if(result){
      setShowResult(false);
  
      // const newChatEntry = { prompt: prevPrompt, result: result };
      // console.log(newChatEntry);
  
      // // Use functional update to ensure correct state
      // setRecent((prevRecent) => {
      //   const updatedRecent = prevRecent.some((_, index) => index === id)
      //   ? prevRecent.map((chat, index) => index === id ? newChatEntry : chat)
      //   : [...prevRecent, newChatEntry];
  
      //     // Save to localStorage after updating state
      //     localStorage.setItem(currentUser.email, JSON.stringify(updatedRecent));
  
      //     return updatedRecent; // Update the state
      // });
  
      // Reset other states
      setResult([]);
      setPrevPrompt([]);
      setInput("");
      setId(recent.length + 1); // Update id after the recent array length is updated
      console.log(id);
    }
    else{
      console.log("Empty prompt")
    }
  };
  

    const UpdateChat = (id) => {
        setShowResult(false)
        setId(id)
        setRecent((prev) =>
          prev.map((item, index) =>
            index === id
              ? {  prompt: prevPrompt, result: result }
              : item
          )
        );
        setResult([])
        setPrevPrompt([])
        setInput("")
        setId(recent.length)
      };

    const showrecent=(id)=>{
        if(id>=0 && id<recent.length){
        setId(id)
        setShowResult(true)
        setId(id)
        setPrevPrompt(recent[id].prompt)
        setResult(recent[id].result)
        }
        else{
            console.log(`Invalid id: ${id}`)
        }
    }

    const deletChat = (id) => {
      // Filter out the chat to be deleted
      const updatedChat = recent.filter((item, index) => index !== id);
    
      // Update local storage with the new chat list
      localStorage.setItem(currentUser.email, JSON.stringify(updatedChat));
    
      // Update state variables
      setRecent(updatedChat);
      setResult([]);
      setPrevPrompt([]);
    
      // Start a new chat after deletion
      setId(updatedChat.length); // Set id to the next chat position
      setInput("");
      setShowResult(false);
    
      if (updatedChat.length > 0) {
        console.log("Deleted chat. Initiating a new chat...");
      } else {
        console.log("All chats deleted. Ready for a fresh start.");
      }
    };
    
  

    const contextValues = useMemo(
        () => ({
          currentUser,
          UpdateChat,
          recent,
          showrecent,
          newChat,
          onSent,
          input,
          setInput,
          prevPrompt,
          setPrevPrompt,
          result,
          setResult,
          showResult,
          setShowResult,
          loading,
          setLoading,
          prompt,
          setPrompt,
          deletChat,
        }),
        [
          currentUser,
          recent,
          input,
          prevPrompt,
          result,
          showResult,
          loading,
          prompt,
        ]
      );
      

    return(
        <Context.Provider value={contextValues} >
            {props.children}
        </Context.Provider>
    )
}