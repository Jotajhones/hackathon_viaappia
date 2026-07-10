package com.viaappia.api.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequestDTO {
    @NotBlank(message = "O e-mail é obrigatório")
    private String email;

    @NotBlank(message = "A senha é obrigatória")
    private String password;
}