import { Inject, Injectable } from '@nestjs/common';
import { ProviderType } from './enums/provider.type.enum';
import IProvider from './interfaces/provider.interface';
import { OpenAI } from './providers/openai';
import Pattern from 'src/dto/pattern.dto';
import UploadResponse from 'src/dto/upload_response.dto';
import Merchant from 'src/dto/merchant.dto';
import { MistralAI } from './providers/mistral';
import NormalizedTransactions from 'src/dto/normalized_transaction.dto';

@Injectable()
export default class Interpreter {
  private readonly provider: IProvider;

  constructor(@Inject('PROVIDER_TYPE') providerType: ProviderType) {
    switch (providerType) {
      case ProviderType.OpenAI:
        this.provider = new OpenAI();
        break;
      case ProviderType.Mistral:
        this.provider = new MistralAI();
      default:
        break;
    }
  }

  async normalize<T, R extends object | object[]>(
    request: T,
    mode: 'merchant' | 'patterns' | 'normalize',
  ): Promise<R> {
    const prompt = this.generatePrompt(mode, request);
    console.log('prompt', prompt);
    return await this.provider.normalize<R>(prompt);
  }

  private generatePrompt(
    mode: 'merchant' | 'patterns' | 'normalize',
    transactions: any,
  ): string {
    switch (mode) {
      case 'patterns':
        return `
Analyze the following **transaction data** and **detect all recurring payment patterns**, not just subscriptions.

### **💡 What is a Pattern?**
- A **pattern** is any transaction that **recurs with a predictable frequency**.
- It can be **a subscription (Netflix, Spotify)** or **a repeating expense (Uber rides, coffee purchases, groceries, etc.)**.
- **Do not ignore spending patterns that are not subscriptions.**
- If a user frequently **spends at the same place**, detect it as a recurring pattern.

---

### **🛠 Transaction Data**
\`\`\`json
${JSON.stringify(transactions, null, 2)}
\`\`\`

---

### **✅ Expected Response Format**
\`\`\`json
[
  {
    "merchant": "Netflix",
    "type": "subscription",
    "amount": 19.99,
    "frequency": "monthly",
    "confidence": 0.95,
    "next_expected": "2024-02-15",
    "description": "Subscription payment on the 15th of each month"
  },
  {
    "merchant": "Uber",
    "type": "recurring",
    "amount": "~35.00",
    "frequency": "weekly",
    "confidence": 0.90,
    "next_expected": "2024-02-10",
    "description": "User takes Uber trips ~2-3 times per week"
  },
  {
    "merchant": "Starbucks",
    "type": "recurring",
    "amount": "~5.75",
    "frequency": "multiple per week",
    "confidence": 0.85,
    "next_expected": "2024-02-07",
    "description": "User buys coffee at Starbucks multiple times a week"
  },
  {
    "merchant": "Walmart",
    "type": "recurring",
    "amount": "~150.00",
    "frequency": "monthly",
    "confidence": 0.88,
    "next_expected": "2024-02-22",
    "description": "User shops at Walmart every month for groceries"
  }
]
\`\`\`

---

### **🛠 Guidelines for Pattern Detection**
1. **Subscription-based transactions (Netflix, Spotify, Apple Music, etc.)**  
   - If a transaction occurs **monthly on the same date**, classify as "subscription".  
   - Example: **Netflix bill on the 1st of every month → "type": "subscription"**

2. **Transportation patterns (Uber, Lyft, public transit)**  
   - If the user **takes Uber 2-3 times per week**, classify as "recurring".  
   - If the amount varies slightly (~$30-$35), use "amount": "~30.00".  
   - Example: **Uber trips every weekend → "frequency": "weekly"**

3. **Food & Drink (Starbucks, McDonald's, etc.)**  
   - If a user **frequently visits the same restaurant or coffee shop**, classify as "recurring".  
   - Example: **Starbucks 3 times a week → "frequency": "multiple per week"**  

4. **Retail & Grocery Shopping (Walmart, Target, Amazon)**  
   - If the user **shops at Walmart every month**, classify as "recurring".  
   - Example: **Walmart purchases around the 20th each month → "frequency": "monthly"**

---

### **⚠️ Additional Instructions**
- **Find ALL repeating expenses, including transportation, shopping, and food.**
- **Do NOT assume a transaction is random just because it doesn't have a fixed date.**
- **Use "confidence" to indicate how strong the pattern is (0.0 - 1.0).**
`;

      case 'normalize':
        return `
Analyze the following **transaction data** and generate a **normalized output**:
- Identify the **correct category** for each transaction.
- Determine if the transaction is a **subscription**.
- Generate appropriate **"flags"** that describe the transaction.

---

### **🛠 Transaction Data**
\`\`\`json
${JSON.stringify(transactions, null, 2)}
\`\`\`

---

### **✅ Expected Response Format**
\`\`\`json
{
  "normalized_transactions": [
    {
      "original": "UBER *TRIP HELP.UBER.CO",
      "normalized": {
        "category": "Transportation",
        "sub_category": "Ride Sharing",
        "confidence": 0.98,
        "is_subscription": false,
        "merchant": "Uber",
        "flags": ["transportation", "service"]
      }
    }
  ],
  "detected_patterns": [
    {
      "merchant": "Uber",
      "type": "recurring",
      "amount": 35.00,
      "frequency": "weekly",
      "confidence": 0.9,
      "next_expected": "2024-02-10",
      "description": "Regular rides averaging $35.00 per trip"
    }
  ]
}
\`\`\`

---

### **🛠 Guidelines for Normalization**
- **Netflix, Spotify, and Apple should have "is_subscription": true.**
- **Uber and Lyft should have "flags": ["transportation", "service"].**
- **If a transaction is an e-commerce purchase, "flags" should include "online_purchase".**
- **Starbucks, McDonald's, and food places should have "flags": ["food_and_beverage", "restaurant"].**
### **🛠 Guidelines for Pattern Detection**
1. **Subscription-based transactions (Netflix, Spotify, Apple Music, etc.)**  
   - If a transaction occurs **monthly on the same date**, classify as "subscription".  
   - Example: **Netflix bill on the 1st of every month → "type": "subscription"**

2. **Transportation patterns (Uber, Lyft, public transit)**  
   - If the user **takes Uber 2-3 times per week**, classify as "recurring".  
   - If the amount varies slightly (~$30-$35), use "amount": "~30.00".  
   - Example: **Uber trips every weekend → "frequency": "weekly"**

3. **Food & Drink (Starbucks, McDonald's, etc.)**  
   - If a user **frequently visits the same restaurant or coffee shop**, classify as "recurring".  
   - Example: **Starbucks 3 times a week → "frequency": "multiple per week"**  

4. **Retail & Grocery Shopping (Walmart, Target, Amazon)**  
   - If the user **shops at Walmart every month**, classify as "recurring".  
   - Example: **Walmart purchases around the 20th each month → "frequency": "monthly"**
  ### **⚠️ Additional Instructions**
- **Find ALL repeating expenses, including transportation, shopping, and food.**
- **Do NOT assume a transaction is random just because it doesn't have a fixed date.**
- **Use "confidence" to indicate how strong the pattern is (0.0 - 1.0).**
`;

      case 'merchant':
      default:
        return `
Analyze the following transaction and return the **normalized merchant information**:
- Identify the **correct category** (e.g., "Shopping", "Food & Drink", "Transportation").
- Determine the appropriate **"sub_category"** (e.g., "Ride Sharing", "Streaming Service").
- If the transaction is a **subscription**, set "is_subscription": true.
- Generate relevant **"flags"** based on transaction type.

---

### **🛠 Transaction Data**
\`\`\`json
${JSON.stringify(transactions, null, 2)}
\`\`\`

---

### **✅ Expected Response Format**
\`\`\`json
{
  "merchant": "Spotify",
  "category": "Entertainment",
  "sub_category": "Music Streaming",
  "confidence": 0.98,
  "is_subscription": true,
  "flags": ["subscription", "digital_service"]
}
\`\`\`

---

### **🛠 Guidelines for Merchant Normalization**
- **Netflix and Spotify should have "subscription" in "flags".**
- **Uber and Lyft should have "transportation", "service" as "flags".**
- **Starbucks and McDonald's should have "food_and_beverage" flag.**
- **Walmart, Amazon purchases should be "shopping".**
`;
    }
  }
}
