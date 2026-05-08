# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout-negative.spec.ts >> Stripe Checkout Negative Testing >> TC-NEG-CHK-003: Verify error for incorrect CVC
- Location: tests\checkout-negative.spec.ts:53:9

# Error details

```
Test timeout of 180000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - banner [ref=e6]:
      - generic [ref=e8]:
        - link "Back to BluCygnus sandbox" [ref=e9] [cursor=pointer]:
          - /url: https://staging.bluknox.com/api/cancel/
          - generic [ref=e11]:
            - img [ref=e12]
            - generic [ref=e14]: Back
            - generic [ref=e16]:
              - img [ref=e18]
              - heading "BluCygnus sandbox" [level=1] [ref=e20]
        - generic [ref=e21]: Sandbox
    - generic [ref=e22]:
      - generic [ref=e24]:
        - heading "Subscribe to BluKnox Classic" [level=2] [ref=e25]
        - generic [ref=e27]:
          - generic [ref=e31]:
            - generic [ref=e32]: ₹7,061.10
            - generic [ref=e35]:
              - text: per
              - text: year
          - generic [ref=e44]: ₹588.43 / month billed annually
          - group "Choose a currency:" [ref=e46]:
            - generic [ref=e47]:
              - generic [ref=e49]:
                - button "IN INR" [disabled] [ref=e51] [cursor=pointer]:
                  - generic [ref=e53]:
                    - img "IN" [ref=e54]
                    - text: INR
                - button "US USD" [ref=e56] [cursor=pointer]:
                  - generic [ref=e58]:
                    - img "US" [ref=e59]
                    - text: USD
              - generic [ref=e61]:
                - text: 1 USD = 98.2347 INR
                - button "Show tooltip" [ref=e62] [cursor=pointer]:
                  - generic [ref=e63]:
                    - text: (
                    - button "includes 4% conversion fee" [ref=e64]:
                      - generic [ref=e66]: includes 4% conversion fee
                    - text: )
                - text: . Charges will vary based on exchange rates.
      - generic [ref=e67]:
        - list [ref=e68]:
          - listitem [ref=e69]:
            - generic [ref=e72]:
              - generic [ref=e76]: BluKnox Classic
              - generic [ref=e77]:
                - generic [ref=e80]:
                  - generic [ref=e81]: Secure your confidential or sensitive data such as financial, healthcare, legal, research-based, personally identifiable information, etc. locally on your PC. Purchase plans are available for personal as well as business use. Share your data conveniently and securely across all your devices and exchange it securely with others as needed.
                  - button [ref=e82] [cursor=pointer]:
                    - img [ref=e86]
                - generic [ref=e88]:
                  - generic [ref=e90]: Billed annually
                  - generic [ref=e94]: ₹7,061.10 per Licenses
              - generic [ref=e97]: ₹7,061.10
        - generic [ref=e99]:
          - generic [ref=e100]:
            - generic [ref=e101]: Subtotal
            - generic [ref=e103]: ₹7,061.10
          - generic [ref=e109]:
            - textbox "Add promotion code" [ref=e113] [cursor=pointer]
            - button [disabled]:
              - generic:
                - generic: Apply
          - generic [ref=e114]:
            - generic [ref=e115]: Total due today
            - generic [ref=e117]: ₹7,061.10
  - generic [ref=e118]:
    - main [ref=e119]:
      - generic [ref=e124]:
        - list [ref=e126]:
          - listitem [ref=e127]:
            - generic [ref=e135]:
              - link "Link" [ref=e140] [cursor=pointer]:
                - /url: https://link.com/
                - img [ref=e141]
              - button "more" [ref=e153] [cursor=pointer]:
                - img [ref=e156]
          - listitem [ref=e161]:
            - generic [ref=e171]:
              - text: Confirm it’s you
              - generic [ref=e172]:
                - generic [ref=e173]:
                  - text: Enter the code sent to
                  - generic [ref=e175]: •••••• •••33
                  - text: to use your saved information.
                - generic [ref=e176]: You are currently testing and no code will be sent. Enter 000000 to continue.
              - generic [ref=e179]:
                - textbox "Security code character 1" [active] [ref=e180]
                - textbox "Security code character 2" [ref=e181]
                - textbox "Security code character 3" [ref=e182]
                - textbox "Security code character 4" [ref=e183]
                - textbox "Security code character 5" [ref=e184]
                - textbox "Security code character 6" [ref=e185]
              - button "Send code to email instead" [ref=e190] [cursor=pointer]:
                - generic [ref=e193]: Send code to email instead
              - generic [ref=e194]: Logging in as banti.guleria@idsil.com
        - button "Pay without Link" [ref=e200] [cursor=pointer]:
          - generic [ref=e203]: Pay without Link
      - generic [ref=e204]:
        - checkbox "I am an AI agent acting on behalf of someone else" [ref=e205]
        - text: I am an AI agent acting on behalf of someone else
    - contentinfo [ref=e207]:
      - link "Powered by Stripe" [ref=e209] [cursor=pointer]:
        - /url: https://stripe.com
        - generic [ref=e210]:
          - text: Powered by
          - img "Stripe" [ref=e212]
      - link "Terms" [ref=e215] [cursor=pointer]:
        - /url: https://stripe.com/legal/end-users
      - link "Privacy" [ref=e216] [cursor=pointer]:
        - /url: https://stripe.com/privacy
```