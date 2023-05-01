package boat.amazing.backend.controller;

import boat.amazing.backend.dto.UserDto;
import boat.amazing.backend.dto.UserRegistrationDto;
import boat.amazing.backend.entities.User;
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
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public UserDto login(Authentication authentication) {
        logger.info("controller: /user/login ");
        if (authentication == null) {
            return null;
        }
        User user = (User) authentication.getPrincipal();
        return new UserDto(user.getUsername());
    }

    @GetMapping("/logout")
    public ResponseEntity logout(SecurityContextLogoutHandler securityContextLogoutHandler, HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logger.info("controller: /user/logout");
        securityContextLogoutHandler.logout(request, response, authentication);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public UserDto registerUser(@Validated @RequestBody UserRegistrationDto userRegistrationDto) {
        logger.info("controller: /user/register " + userRegistrationDto.getEmail());
        return userService.registerUser(userRegistrationDto);
    }


    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ResponseStatus> handleBadCredentials(Exception e) {
        logger.info("badCredentialsException handler called exception:"+e.toString());
        return ResponseEntity.ok().build();
    }

}
