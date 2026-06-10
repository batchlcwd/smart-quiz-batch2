export const exceptionHandler=(error,req,resp,next)=>{
    console.log("global exception handler")
    console.log(error)
    console.log(error.message)
    return resp.status(400).json({message:error.message,error:error})
}