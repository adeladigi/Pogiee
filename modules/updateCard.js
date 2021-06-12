

//list all credit cards on file

const cards = await stripe.customers.listSources(
  'cus_Jed6HqPP1rfIIV',
  {object: 'card', limit: 3}
);

// brings back all this info
{
  "object": "list",
  "url": "/v1/customers/cus_Jed6HqPP1rfIIV/sources",
  "has_more": false,
  "data": [
    {
      "id": "card_1J1WYUJuBewLEj8dVcZ35o2W",
      "object": "card",
      "address_city": null,
      "address_country": null,
      "address_line1": null,
      "address_line1_check": null,
      "address_line2": null,
      "address_state": null,
      "address_zip": null,
      "address_zip_check": null,
      "brand": "Visa",
      "country": "US",
      "customer": "cus_Jed6HqPP1rfIIV",
      "cvc_check": "pass",
      "dynamic_last4": null,
      "exp_month": 8,
      "exp_year": 2022,
      "fingerprint": "EKvgU5iS0Uwr27RD",
      "funding": "credit",
      "last4": "4242",
      "metadata": {},
      "name": null,
      "tokenization_method": null
    },
    {...},
    {...}
  ]
}
