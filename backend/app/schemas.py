from pydantic import BaseModel, EmailStr
import datetime


# User
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: str
    created_at: datetime.datetime

    model_config = {"from_attributes": True}


# Auth
class Token(BaseModel):
    access_token: str
    token_type: str


# Category
class CategoryCreate(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str

    model_config = {"from_attributes": True}


# Expense
class ExpenseCreate(BaseModel):
    title: str
    amount: float
    date: datetime.datetime | None = None
    category_id: int | None = None

class ExpenseOut(BaseModel):
    id: int
    title: str
    amount: float
    date: datetime.datetime
    category: CategoryOut | None

    model_config = {"from_attributes": True}