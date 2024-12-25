import styled from "styled-components"

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    line-height: 140%;
    font-weight: 500;
    color: #010b13;

    // &::after{
    //   content: '*';
    //   color: #FF5B5B;
    // }
  }

  input,
  select,
  textarea,
  .input-div {
    font-size: 14px;
    padding: 0.625rem 0.875rem;
    line-height: 140%;
    border: 1px solid #d0d5dd;
    box-shadow: 0px 1px 2px 0px #1018280d;
    border-radius: 0.5rem;
    width: 100%;
    background-color: transparent !important;
    outline: 0;

    &:disabled {
      background-color: #f9f9f9 !important;
      cursor: not-allowed;
    }
    input,
    select {
      padding: 0;
      border: 0;
      box-shadow: none;
      border-radius: 0;
    }
    &::placeholder {
      color: #8c92ac;
    }
    .input-div,
    textarea,
    input,
    select {
      &:focus,
      &:focus-within {
        box-shadow: none !important;
        border: 0 !important;
      }
    }
    &:focus,
    &:focus-within {
      border-color: #0070f3;
      box-shadow: 0px 0px 0px 4.5px #deedff;
    }

    @media (max-width: 768px) {
      padding: 0.65rem 0.5rem;
    }
  }
`

export const Table = styled.table`
  width: 100%;
  overflow-x: auto;
  border: 0.75px solid #ededed;
  th {
    border-bottom: 1px solid #ededed;
    padding: 10px 20px !important;
    font-size: 14px;
    text-align: left;
    font-weight: 700;
    color: #0d1415;
    text-transform: uppercase;
    border-top: none;
    cursor: pointer;

    background-color: #df6e2f;
    padding: 13px 24px;
    &:nth-of-type(odd) {
      background-color: #df6e2f;
    }
  }
  tr {
    &:hover {
      cursor: pointer;
      background-color: #f9fafb;
    }
    &:last-of-type {
      td {
        border-bottom: 0;
      }
    }
    th,
    td {
      border-bottom: 1px solid #ededed;
      /* padding: 18px 20px 18px 20px; */
      text-align: left;
    }
    td:first-child,
    th:first-child {
      border-left: none;
    }
    th {
    }
    td {
      padding: 18px 24px;
      color: #667085;
      font-size: 14px;
    }
  }

  tbody {
    tr {
      &:nth-of-type(even) {
        background-color: #f9f9f9;
      }
    }
  }
`

export const returnColor = (status: string) => {
  if (status) {
    const statusNew = status.toLowerCase()
    switch (statusNew) {
      case "successful":
      case "paid":
      case "active":
      case "completed":
      case "accepted":
        return {
          bg: "#ECFDF3",
          text: "#027A48",
          circle: "#12B76A",
        }

      case "refunded":
      case "inactive":
        return {
          bg: "#F2F4F7",
          text: "#344054",
          circle: "#667085",
        }

      case "pending":
      case "scheduled":
        return {
          bg: "#FFF8E2",
          text: "#F79009",
        }

      case "failed":
      case "cancelled":
      case "rejected":
      case "declined":
        return {
          bg: "#FEF3F2",
          text: "#B42318",
        }

      default:
        return {
          bg: "#FEFEFE",
          text: "#000000",
        }
    }
  } else
    return {
      bg: "#FEFEFE",
      text: "#000000",
    }
}
export const Table1 = styled.table`
  width: 100%;
  /* border: 1px solid #EDEDED; */
  background-color: #fff;
  font-size: 14px;
  border-radius: 10px;
  tr {
    border-bottom: 1px solid #ededed;
  }
  th,
  td {
    text-align: left;
  }
  th {
    font-weight: 500;
    color: #101828;
    background-color: #f9fafb;
    font-size: 12px;
    padding: 13px 24px;
  }
  td {
    padding: 16px 24px;
    color: #667085;
    font-size: 14px;
  }
`
export const HeadingWithUnderline = styled.h2`
  font-size: 32px;
  font-weight: 700;
  line-height: 28.8px;
  text-align: left;
  color: #101828;
  padding-bottom: 1rem;
  position: relative;
  margin-bottom: 1.5rem;

  &::after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    margin: auto;
    height: 4px;
    width: 80px;
    background-color: #df6e2f;
    border-radius: 4px;
  }
`

export const UserDets = styled.div`
  label {
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
    line-height: 140%;
    font-weight: 500;
    color: #010b13;
  }
  p {
    font-weight: 600;
    color: black;
    font-size: 18px;
  }
`
