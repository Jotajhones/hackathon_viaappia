package com.viaappia.api.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

import org.springdoc.core.utils.SpringDocUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    static {
        SpringDocUtils.getConfig().addSimpleTypesForParameterObject(org.springframework.data.domain.Pageable.class);
    }

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
   
        return new OpenAPI()
                .info(new Info()
                        .title("ViaAppia Hackathon API")
                        .version("1.0.0")
                        .description("Documentação das rotas da API de Gestão de Incidentes."))
         

                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()


                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}