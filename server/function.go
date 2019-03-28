package p

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	sendgrid "github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Mail : defines the email message object
type Mail struct {
	Option      string `json:"option"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phoneNumber"`
	Company     string `json:"company"`
	Subject     string `json:"subject"`
}

// MessageReceived : entry point
func MessageReceived(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var message Mail
	if err := decoder.Decode(&message); err != nil {
		fmt.Println(err)
		return
	}

	sendMail(w, &message)
}

func sendMail(w http.ResponseWriter, message *Mail) {
	request := sendgrid.GetRequest(os.Getenv("SENDGRID_API"), "/v3/mail/send", "https://api.sendgrid.com")
	request.Method = "POST"
	var Body = generateMail(message)
	request.Body = Body
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err)
		return
	} else {
		fmt.Println(response.StatusCode)
		fmt.Fprintf(w, response.Body)
		fmt.Println(response.Headers)
	}
}

func generateMail(message *Mail) []byte {
	address := message.Email
	name := message.Name
	from := mail.NewEmail(name, address)
	subject := "I want realeyes to help with: " + message.Option
	address = "info@realeyes.com"
	name = "RealEyes Media"
	to := mail.NewEmail(name, address)
	content := mail.NewContent("text/plain", message.Subject)
	m := mail.NewV3MailInit(from, subject, to, content)
	return mail.GetRequestBody(m)
}
