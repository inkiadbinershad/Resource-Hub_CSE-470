# TODO: Rewrite BookingContext.jsx to use real API

## Step 1: Analyze current implementation
- [x] Read BookingContext.jsx - uses mock data
- [x] Read api.js - has getMyBookings, createBooking, cancelBooking functions
- [x] Read AuthContext.jsx - provides useAuth() hook with token

## Step 2: Plan the rewrite
- [ ] Update BookingContext.jsx to use API functions instead of mock data
- [ ] Implement fetchBookings() using getMyBookings(token)
- [ ] Update addBooking() to call createBooking() then re-fetch
- [ ] Update cancelBooking() to call cancelBooking(id, token) then re-fetch
- [ ] Add useAuth() to get token from AuthContext

## Step 3: Implementation
- [x] Edit src/context/BookingContext.jsx with new implementation
