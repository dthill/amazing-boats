package boat.amazing.backend.services;

import boat.amazing.backend.dto.UserDto;
import boat.amazing.backend.dto.UserRegistrationDto;
import boat.amazing.backend.entities.User;
import boat.amazing.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public UserDto registerUser(UserRegistrationDto userRegistrationDto) {
        User existingUser = userRepository.findUserByUsername(userRegistrationDto.getEmail());
        if (existingUser != null) {
            return null;
        }
        User user = new User();
        user.setUsername(userRegistrationDto.getEmail());
        user.setPassword(userRegistrationDto.getPassword());
        User savedUser = userRepository.save(user);
        return new UserDto(savedUser.getUsername());
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        return user;
    }

}
