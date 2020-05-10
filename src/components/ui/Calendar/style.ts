import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { color } from '../../../styles/styles';
import { Button } from '../Button/index';
import { darken } from 'polished';

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
  text-align: left;
  span {
    margin: 0;
    padding-left: 5px;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 20px;
    color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};
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

export const CalendarControlButtons = styled(Button)`
  font-size: 20px;
  line-height: 0;
  &:first-child {
    margin-right: 10px;
  }
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
    button:not(:disabled) {
      .day-number {
        border: solid 1px ${color.successButton};
      }
    }
  }
  &.selected-day {
    button:not(:disabled) {
      .day-number {
        background-color: ${color.successButton};
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
    min-height: 30px;
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: transparent;
    border: none;
    justify-content: center;
    color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};
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
        background-color: transparent;
        box-shadow: 0px 0px 2px 2px ${color.primary};
      }
    }
    &:disabled {
      color: ${(props): string => (props.theme === 'dark' ? darken(0.2, color.darkModeLight) : color.medium)};
    }
    &:disabled:hover {
      cursor: default;
    }
  }
`;

export const DayName = styled.th`
  text-align: center;
  padding: 5px;
  font-size: 13px;
  color: ${color.darkest};
  width: 14%;
  border-bottom: solid 1px ${color.medium};
  color: ${(props): string => (props.theme === 'dark' ? color.darkModeLight : color.darkest)};
`;

export const Week = styled.tr``;
