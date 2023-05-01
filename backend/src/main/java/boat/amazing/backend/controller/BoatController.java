package boat.amazing.backend.controller;

import boat.amazing.backend.dto.AddBoatDto;
import boat.amazing.backend.dto.UserDto;
import boat.amazing.backend.dto.UserRegistrationDto;
import boat.amazing.backend.entities.Boat;
import boat.amazing.backend.entities.User;
import boat.amazing.backend.services.BoatService;
import boat.amazing.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/boat")
public class BoatController {

    private final BoatService boatService;
    private final Logger logger = LoggerFactory.getLogger(BoatController.class);

    @Autowired
    public BoatController(BoatService boatService) {
        this.boatService = boatService;
    }

    @GetMapping("/all")
    public List<Boat> all() {
        logger.info("controller: /boats/all ");
        return boatService.findAll();
    }

    @PostMapping()
    public Boat save(@Validated @RequestBody AddBoatDto boat) {
        logger.info("controller: post boat/ " + boat);
        Boat addBoat = new Boat();
        addBoat.setName((boat.getName()));
        addBoat.setDescription(boat.getDescription());
        return boatService.saveBoat(addBoat);
    }

    @PutMapping()
    public Boat edit(@Validated @RequestBody Boat boat) {
        logger.info("controller: post boat/ " + boat);
        return boatService.saveBoat(boat);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) {
        logger.info("controller: delete boat/ " + id);
        boatService.deleteBoat(id);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseStatus> handleBadCredentials(Exception e) {
        logger.info("badCredentialsException handler called exception:"+e.toString());
        return ResponseEntity.ok().build();
    }

}
