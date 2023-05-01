package boat.amazing.backend.dto;

import jakarta.validation.constraints.Email;
import lombok.*;


@Data
@AllArgsConstructor
public class UserDto {
    @Email
    private String email;
}
