# Beverage-Vending-Machine
### Design a system which will automate beverage vending machine. The main functions of this system are:

1. Displaying all beverages that the machine can dispense
2. Dispensing correct beverage:
  Vending machine comes with 4 varieties of coffee.
  Black coffee: 3 units of water, 1 unit of coffee, 1 unit of sugar
  Coffee with milk: 1 unit of water, 1 unit of coffee, 2 units of milk, 1 unit of sugar
  Above two variants also come with respective sugarless versions where the 1 unit of sugar is not used.
3. Managing the inventory:
  The vending machine has limited inventory and it will need to notify the staff when it has run out of any of the ingredients. Also, it will have the ability to gracefully stop the orders
  of the beverages which don’t have sufficient ingredients. The system will need to provide a way to top up the stock of the ingredients.

You have to come up with backend logic, suitable data structures / tables / collections and APIs which can be used by the team developing the UI of the vending machine.

### Expectations:
- Build JSON APIs
- Use Restful APIs for CRUD(Create, Read, Update, Delete) operations
- Usage of ORM is allowed
- Object Oriented Implementation is expected
- Test cases

### Advice:
- Choose whatever Object Oriented language you’re comfortable with
- We expect to see the code which you would be happy to put in production
- If something is not clear don’t hesitate to ask or just make an assumption and go with it

---
# Frontend
- npm create vite@latest vending-machine -- --template react)
- select framework - React
- select script - javascript
- npm i nodemon - npm run dev
- make sure npm version should be v18 (node -v)
- server will start running

For tailwind css: 
- install tailwind css and config files
- follow the instructions step.
- run and use. Example to check tailwind apply or not.
```
<h1 class="text-3xl font-bold underline"> Vending Machine </h1>
```

# Github
- git init
- git remote add origin git@github.com:ModanwalPriti06/Beverage-Vending-Machine.git
- git status
- git add .
- git commit -m "Initial frontend with Tailwind CSS for Beverage Vending Machine"
- git branch -M main
- git push -u origin main

# Backend setup

