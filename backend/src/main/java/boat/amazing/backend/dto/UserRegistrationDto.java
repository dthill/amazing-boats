package boat.amazing.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;


@Data
public class UserRegistrationDto {
    @Email
    private String email;

    @NotNull
    private String password;
}
