// ******************************************
//  Здесь мы расширяем класс Error 
// 
//  довляем свои методы обработки ошибок 

// ******************************************
class ApiError extends Error{
  constructor(status, message){
    super()
    this.status = status
    this.message = message 
  }
  
  //клиентская ошибка в запросе (ответ не найден)
  static badRequest(message){
    return new ApiError(404, message)
  }
  
  //внутренняя ошибка сервера 
  static internal(message){
    return new ApiError(500, message)
  }
  
  //клиентская ошибка доступ запрещён
  static forbidden(message){
    return new ApiError(403, message)
  }
}

module.exports = ApiError