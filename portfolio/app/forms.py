from django import forms
from constance import config

import smtplib

from email.mime.text import MIMEText

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, label='이름', required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label="이메일", required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    message = forms.CharField(label="내용", required=True, widget=forms.Textarea(attrs={'class': 'form-control'}))
    
    def send_mail(self):
        print("Connecting to SMTP server {}:{}...".format(config.EMAIL_HOST, config.EMAIL_PORT))
        smtp = smtplib.SMTP_SSL(config.EMAIL_HOST, config.EMAIL_PORT)
        print("Logging in using account {}, password {}...".format(config.EMAIL_HOST_USER, config.EMAIL_HOST_PASSWORD))
        smtp.login(config.EMAIL_HOST_USER, config.EMAIL_HOST_PASSWORD)
        
        msg = MIMEText(self.cleaned_data['message'])
        msg['Subject'] = 'Portfolio Contact From "{}" [{}]'.format(self.cleaned_data['name'], self.cleaned_data['email'])
        msg['To'] = config.EMAIL_TO
        msg['From'] = config.EMAIL_HOST_USER
        
        print("Sending email...")
        print("From: {}".format(msg['From']))
        print("To: {}".format(msg['To']))
        print("Subject: {}".format(msg['Subject']))
        
        smtp.send_message(msg)
        smtp.quit()