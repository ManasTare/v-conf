package com.example.controller;

import com.example.dto.*;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequestMapping("/api/i18n")
@CrossOrigin
public class I18nController {

    private final MessageSource messageSource;

    public I18nController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/footer")
    public FooterI18nDTO getFooter(Locale locale) {
        FooterI18nDTO dto = new FooterI18nDTO();
        dto.sitemap = messageSource.getMessage("footer.sitemap", null, locale);
        dto.privacy = messageSource.getMessage("footer.privacy", null, locale);
        dto.terms = messageSource.getMessage("footer.terms", null, locale);
        dto.contact = messageSource.getMessage("footer.contact", null, locale);
        dto.support = messageSource.getMessage("footer.support", null, locale);
        return dto;
    }

    @GetMapping("/welcome")
    public WelcomeI18nDTO getWelcome(Locale locale) {
        WelcomeI18nDTO dto = new WelcomeI18nDTO();
        dto.title = messageSource.getMessage("welcome.title", null, locale);
        dto.subtitle = messageSource.getMessage("welcome.subtitle", null, locale);
        return dto;
    }

    @GetMapping("/login")
    public LoginI18nDTO getLogin(Locale locale) {
        LoginI18nDTO dto = new LoginI18nDTO();
        dto.title = messageSource.getMessage("login.title", null, locale);
        dto.subtitle = messageSource.getMessage("login.subtitle", null, locale);
        dto.username = messageSource.getMessage("login.username", null, locale);
        dto.usernamePlaceholder = messageSource.getMessage("login.usernamePlaceholder", null, locale);
        dto.password = messageSource.getMessage("login.password", null, locale);
        dto.passwordPlaceholder = messageSource.getMessage("login.passwordPlaceholder", null, locale);
        dto.forgotPassword = messageSource.getMessage("login.forgotPassword", null, locale);
        dto.signIn = messageSource.getMessage("login.signIn", null, locale);
        dto.orContinueWith = messageSource.getMessage("login.orContinueWith", null, locale);
        return dto;
    }

    @GetMapping("/navbar")
    public NavbarI18nDTO getNavbar(Locale locale) {
        NavbarI18nDTO dto = new NavbarI18nDTO();
        dto.home = messageSource.getMessage("navbar.home", null, locale);
        dto.aboutUs = messageSource.getMessage("navbar.aboutUs", null, locale);
        dto.contactUs = messageSource.getMessage("navbar.contactUs", null, locale);
        dto.signIn = messageSource.getMessage("navbar.signIn", null, locale);
        dto.registerCompany = messageSource.getMessage("navbar.registerCompany", null, locale);
        dto.dashboard = messageSource.getMessage("navbar.dashboard", null, locale);
        dto.logout = messageSource.getMessage("navbar.logout", null, locale);
        return dto;
    }

    @GetMapping("/contact")
    public ContactI18nDTO getContact(Locale locale) {
        ContactI18nDTO dto = new ContactI18nDTO();
        dto.title = messageSource.getMessage("contact.title", null, locale);
        dto.subtitle = messageSource.getMessage("contact.subtitle", null, locale);
        dto.addressLabel = messageSource.getMessage("contact.addressLabel", null, locale);
        dto.addressValue = messageSource.getMessage("contact.addressValue", null, locale);
        dto.emailLabel = messageSource.getMessage("contact.emailLabel", null, locale);
        dto.phoneLabel = messageSource.getMessage("contact.phoneLabel", null, locale);
        dto.formTitle = messageSource.getMessage("contact.formTitle", null, locale);
        dto.formSubtitle = messageSource.getMessage("contact.formSubtitle", null, locale);
        dto.namePlaceholder = messageSource.getMessage("contact.namePlaceholder", null, locale);
        dto.emailPlaceholder = messageSource.getMessage("contact.emailPlaceholder", null, locale);
        dto.messagePlaceholder = messageSource.getMessage("contact.messagePlaceholder", null, locale);
        dto.sendButton = messageSource.getMessage("contact.sendButton", null, locale);
        return dto;
    }

    @GetMapping("/features")
    public FeaturesI18nDTO getFeatures(Locale locale) {
        FeaturesI18nDTO dto = new FeaturesI18nDTO();
        dto.vehicleSelectionTitle = messageSource.getMessage("features.vehicleSelection.title", null, locale);
        dto.vehicleSelectionDesc = messageSource.getMessage("features.vehicleSelection.desc", null, locale);
        dto.customConfigTitle = messageSource.getMessage("features.customConfig.title", null, locale);
        dto.customConfigDesc = messageSource.getMessage("features.customConfig.desc", null, locale);
        dto.invoiceGenTitle = messageSource.getMessage("features.invoiceGen.title", null, locale);
        dto.invoiceGenDesc = messageSource.getMessage("features.invoiceGen.desc", null, locale);
        dto.securePlatformTitle = messageSource.getMessage("features.securePlatform.title", null, locale);
        dto.securePlatformDesc = messageSource.getMessage("features.securePlatform.desc", null, locale);
        return dto;
    }

    // ✅ REGISTRATION I18N (PUBLIC, NO LOGIN REQUIRED)
    @GetMapping("/registration")
    public RegistrationI18nDTO getRegistration(Locale locale) {

        RegistrationI18nDTO dto = new RegistrationI18nDTO();

        dto.title = messageSource.getMessage("registration.title", null, locale);
        dto.subtitle = messageSource.getMessage("registration.subtitle", null, locale);

        dto.companyName = messageSource.getMessage("registration.companyName", null, locale);
        dto.companyNamePlaceholder = messageSource.getMessage("registration.companyNamePlaceholder", null, locale);

        dto.registrationNo = messageSource.getMessage("registration.registrationNo", null, locale);
        dto.registrationNoPlaceholder = messageSource.getMessage("registration.registrationNoPlaceholder", null,
                locale);

        dto.holdingType = messageSource.getMessage("registration.holdingType", null, locale);

        dto.addressLine1 = messageSource.getMessage("registration.addressLine1", null, locale);
        dto.addressLine1Placeholder = messageSource.getMessage("registration.addressLine1Placeholder", null, locale);
        dto.addressLine2 = messageSource.getMessage("registration.addressLine2", null, locale);
        dto.addressLine2Placeholder = messageSource.getMessage("registration.addressLine2Placeholder", null, locale);

        dto.city = messageSource.getMessage("registration.city", null, locale);
        dto.state = messageSource.getMessage("registration.state", null, locale);
        dto.pin = messageSource.getMessage("registration.pin", null, locale);

        dto.authName = messageSource.getMessage("registration.authName", null, locale);
        dto.authTel = messageSource.getMessage("registration.authTel", null, locale);
        dto.email = messageSource.getMessage("registration.email", null, locale);

        dto.username = messageSource.getMessage("registration.username", null, locale);
        dto.password = messageSource.getMessage("registration.password", null, locale);
        dto.confirmPassword = messageSource.getMessage("registration.confirmPassword", null, locale);

        dto.registerButton = messageSource.getMessage("registration.registerButton", null, locale);
        dto.alreadyHaveAccount = messageSource.getMessage("registration.alreadyHaveAccount", null, locale);
        dto.signInLink = messageSource.getMessage("registration.signInLink", null, locale);

        return dto;
    }
}