package com.petcare.Petcare.exception;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler 
{
	@ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(
            MethodArgumentNotValidException ex) 
	{

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult()
          .getFieldErrors()
          .forEach(error ->
              errors.put(
                  error.getField(),
                  error.getDefaultMessage()
              )
          );

        return ResponseEntity
        		.status(HttpStatus.BAD_REQUEST)
                .body(errors);
    }
	
	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<Map<String, String>>
	        handleRuntimeException(RuntimeException ex) {

	    Map<String, String> error = new HashMap<>();

	    error.put("error", ex.getMessage());
	    
	    String message = ex.getMessage();

        if (message != null &&
                message.toLowerCase()
                       .contains("not found")) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(error);
        }
        
	    return ResponseEntity
	            .status(HttpStatus.BAD_REQUEST)
	            .body(error);
	}
}
