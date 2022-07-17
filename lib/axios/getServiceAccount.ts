import axios from 'axios'

type ServiceAccount = {
	type: 'service_account'
	project_id: string
	private_key_id: string
	private_key: string
	client_email: string
	client_id: string
	auth_uri: string
	token_uri: string
	auth_provider_x509_cert_url: string
	client_x509_cert_url: string
}

export const getServiceAccount = async (idToken: string) =>
	axios
		.get<ServiceAccount>('/static/firebase', {
			headers: {
				Authorization: `Bearer ${idToken}`,
			},
		})
		.then((r) => r.data)
