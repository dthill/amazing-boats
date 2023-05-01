package boat.amazing.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class BoatDto {
    @NotNull
    private long id;
    @NotNull
    private String name;
    @NotNull
    private String description;
}
