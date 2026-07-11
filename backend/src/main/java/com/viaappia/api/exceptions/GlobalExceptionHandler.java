package com.viaappia.api.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import com.viaappia.api.dto.ErrorResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.time.OffsetDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

        // 404 - Not Found
        @ExceptionHandler(GlobalException.class)
        public ResponseEntity<ErrorResponse> handleGlobalException(
                        GlobalException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.NOT_FOUND.value(),
                                HttpStatus.NOT_FOUND.getReasonPhrase(),
                                ex.getMessage(),
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }

        // 404 - Not Found
        @ExceptionHandler(NoResourceFoundException.class)
        public ResponseEntity<ErrorResponse> handleNotFound(
                        NoResourceFoundException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.NOT_FOUND.value(),
                                HttpStatus.NOT_FOUND.getReasonPhrase(),
                                "A rota solicitada não existe: " + request.getRequestURI(),
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(erro);
        }

        // 400 - Bad Request
        @ExceptionHandler(MethodArgumentTypeMismatchException.class)
        public ResponseEntity<ErrorResponse> handleMethodArgumentTypeMismatchException(
                        MethodArgumentTypeMismatchException ex,
                        HttpServletRequest request) {

                String nomeDoParametro = ex.getName();
                Object valorRecebido = ex.getValue();

                String mensagem = String.format(
                                "O parâmetro '%s' recebeu o valor '%s', que é inválido. Esperava-se um valor do tipo %s.",
                                nomeDoParametro, valorRecebido, ex.getRequiredType().getSimpleName());

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                                mensagem,
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // 400 - Bad Request
        @ExceptionHandler(HttpMessageNotReadableException.class)
        public ResponseEntity<ErrorResponse> handleNotReadableException(
                        HttpMessageNotReadableException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.BAD_REQUEST.value(),
                                HttpStatus.BAD_REQUEST.getReasonPhrase(),
                                "Corpo da requisição incompleto ou campo com valor inesperado.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(erro);
        }

        // 401 - Unauthorized
        @ExceptionHandler(AuthenticationException.class)
        public ResponseEntity<ErrorResponse> handleAuthenticationException(
                        AuthenticationException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.UNAUTHORIZED.value(),
                                HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                                "Falha de autenticação. Token inválido, expirado ou ausente.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(erro);
        }

        // 403 - Forbidden
        @ExceptionHandler(AccessDeniedException.class)
        public ResponseEntity<ErrorResponse> handleAccessDeniedException(
                        AccessDeniedException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.FORBIDDEN.value(),
                                HttpStatus.FORBIDDEN.getReasonPhrase(),
                                "Você não tem permissão para executar esta ação.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(erro);
        }

        // 409 - Conflict (Restrição de banco de dados, ex: e-mail já existe)
        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ErrorResponse> handleDataIntegrityViolationException(
                        DataIntegrityViolationException ex,
                        HttpServletRequest request) {

                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.CONFLICT.value(),
                                HttpStatus.CONFLICT.getReasonPhrase(),
                                "Conflito de dados. O registro já existe ou viola uma restrição do banco de dados.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.CONFLICT).body(erro);
        }

        // 422 - Unprocessable Entity
        @SuppressWarnings("deprecation")
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ErrorResponse> handleValidationException(
                        MethodArgumentNotValidException ex,
                        HttpServletRequest request) {

                @SuppressWarnings("deprecation")
                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.UNPROCESSABLE_ENTITY.value(),
                                HttpStatus.UNPROCESSABLE_ENTITY.getReasonPhrase(),
                                "Erro de validação nos dados enviados. Verifique os campos obrigatórios.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(erro);
        }

        // 500 - Internal Server Error
        @ExceptionHandler(Exception.class)
        public ResponseEntity<ErrorResponse> handleGenericException(
                        Exception ex,
                        HttpServletRequest request) {
                ex.printStackTrace();
                ErrorResponse erro = new ErrorResponse(
                                OffsetDateTime.now(),
                                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                                "Ocorreu um erro interno inesperado no servidor.",
                                request.getRequestURI());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(erro);
        }
}