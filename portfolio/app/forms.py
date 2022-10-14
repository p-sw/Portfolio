from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=100, label='이름', required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(label="이메일", required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    message = forms.CharField(label="내용", required=True, widget=forms.Textarea(attrs={'class': 'form-control'}))
    
    def send_mail(self):
        ...