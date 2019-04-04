package sendmail

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	sendgrid "github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

// SG : SendGrid API key from env vars
var SG = os.Getenv("SENDGRID_API")

// Mail : defines the email message object
type Mail struct {
	Help      string `json:"help"`
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Email     string `json:"email"`
	Phone     string `json:"phone"`
	Company   string `json:"company"`
	Subject   string `json:"subject"`
}

// MessageReceived : entry point
func MessageReceived(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
		return
	}
	// Set CORS headers for the main request.
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	decoder := json.NewDecoder(r.Body)
	var message Mail
	if err := decoder.Decode(&message); err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(message)
	sendMail(w, &message)
}

func sendMail(w http.ResponseWriter, message *Mail) {
	request := sendgrid.GetRequest(SG, "/v3/mail/send", "https://api.sendgrid.com")
	request.Method = "POST"
	var Body = generateMail(message)
	request.Body = Body
	response, err := sendgrid.API(request)
	if err != nil {
		fmt.Println(err)
		return
	}

	fmt.Println(response.StatusCode)
	fmt.Fprintf(w, response.Body)
	fmt.Println(response.Headers)
}

func generateMail(message *Mail) []byte {
	address := message.Email
	name := message.FirstName + " " + message.LastName
	from := mail.NewEmail(name, address)
	subject := "I want realeyes to help with: " + message.Help
	address = "phil@realeyes.com"
	name = "RealEyes Media"
	to := mail.NewEmail(name, address)
	htmlContent := createContent(message)
	content := mail.NewContent("text/html", htmlContent)
	m := mail.NewV3MailInit(from, subject, to, content)
	return mail.GetRequestBody(m)
}

func createContent(message *Mail) string {
	content := "<div><h4>Hello RealEyes, You just received a new email from " + message.FirstName + " " + message.LastName + "</h4>" +
		"<br>First name: " + message.FirstName + "<br>Last name: " + message.LastName +
		"<br>Phone number: " + message.Phone + "<br>Company: " + message.Company +
		"<br>Reason for inquiry: " + message.Help + "<br><br>" +
		message.Subject + "</div>"

	return content
}
