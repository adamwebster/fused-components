import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';

export const Table = styled.table`
  padding: 0;
  border-collapse: collapse;
  width: 100%;
  height: calc(100% - 32px);
  border-spacing: 0;
`;

interface CWProps {
  calendarWidth: number | undefined;
}

export const CalendarWrapper = styled.div<CWProps>`
  width: ${(props): string | FlattenSimpleInterpolation | undefined =>
    props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
  display: flex;
  height: ${(props): string | FlattenSimpleInterpolation | undefined =>
    props.calendarWidth ? `${props.calendarWidth}px` : 'fit-content'};
  flex-flow: column;
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
`;

export const CalendarTitle = styled.div`
  flex: 1 1;
  span {
    margin: 0;
    padding-left: 5px;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 1.5em;
    display: inline-block;
  }
`;

export const CalendarControl = styled.div`
  margin-left: 10px;
  button:first-of-type {
    margin-right: 15px;
  }
`;

export const SvgWrapper = styled.span`
  width: 16px;
  display: block;
`;
export const Day = styled.td`
  text-align: center;
  box-sizing: border-box;
  padding: 0;
  &.current-day {
    button {
      border: solid 2px tomato;
      box-sizing: border-box;
      transition: none;
      &:hover {
        border-color: transparent;
        border-width: none;
      }
    }
  }
  &.selected-day {
    background-color: tomato;
    color: #fff;
  }
  &:hover:not(.selected-day):not(.other-month) {
    background-color: ${color.primary};
    color: #fff;
    cursor: pointer;
  }
  &.other-month {
    color: ${color.mediumdark};
  }
  button {
    color: inherit;
    text-decoration: none;
    font-size: 1em;
    padding: 5px;
    width: 100%;
    border-radius: 0;
    &:hover {
      color: #fff !important;
    }
    &:active,
    &:focus {
      box-sizing: border-box;
      background-color: ${color.primary};
      color: #fff;
    }
    &:disabled:hover {
      color: inherit !important;
      cursor: default;
    }
  }
`;

export const DayName = styled.th`
  text-align: center;
  padding: 5px;
  width: 14%;
  border-bottom: solid 1px ${color.medium};
`;

export const Week = styled.tr``;
