package com.example.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class EmailAuditAspect {
   
	@Before("@annotation(emailAudit)")
	public void beforeEmail(JoinPoint joinPoint,EmailAudit emailAudit) {
		System.out.println(
				"[EMAIL START] Type: "+emailAudit.value()+
				" | Method: " +joinPoint.getSignature().getName()
				);
	}
	
	@AfterReturning("@annotation(emailAudit)")
    public void afterEmail(EmailAudit emailAudit ) {
        System.out.println(
            "[EMAIL SUCCESS] Type: " + emailAudit.value());
    }
	
}
