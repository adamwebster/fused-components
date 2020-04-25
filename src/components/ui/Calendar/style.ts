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
  position: relative;
  padding: 0;
  vertical-align: top;
  &.has-todos {
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      background-color: turquoise;
      position: absolute;
      bottom: 5px;
      left: 16px;
      border-radius: 50%;
    }
  }
  &.current-day {
    button {
      .day-number {
        border: solid 1px tomato;
      }
    }
  }
  &.selected-day {
    button {
      .day-number {
        background-color: tomato;
        color: #fff;
      }
    }
  }
  &:hover:not(.selected-day):not(.other-month) {
    button {
      .day-number {
        background-color: ${color.primary};
        color: #fff;
        cursor: pointer;
      }
    }
  }
  &.other-month {
    color: ${color.mediumdark};
  }
  button {
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: transparent;
    border: none;
    .day-number {
      width: 25px;
      padding-top: 5px;
      height: 25px;
      border-radius: 5px;
      box-sizing: border-box;
    }
    &:hover:not(:disabled) {
      color: #fff !important;
    }
    &:focus {
      outline: none;
      .day-number {
        box-sizing: border-box;
        background-color: ${color.primary};
        color: #fff;
      }
    }
    &:disabled:hover {
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
